import * as React from 'react';
import {NewsModel} from '../../../models/NewsModel';
import {ControlLabel, FormGroup, Col, Button, Grid} from 'react-bootstrap';
import {Link} from 'react-router';
import {FormInput, IInstancePageProps, initializeFormWithInstance} from 'react-hero';
import {store} from '../../../store';

export interface INewsEditPageProps extends IInstancePageProps {
    handleSubmit: (instance: NewsModel) => void;
    handleDelete: (instance: NewsModel) => void;
    instance: NewsModel;
    isCreatePage: boolean;
}

export class NewsEditPage extends React.Component<INewsEditPageProps, void> { 

    static resourceName: string = 'news';
    
    fetchStoreInstance = (): NewsModel => {
        let instance = this.props.instance;
        let instanceKey = this.props.isCreatePage ? `${instance.resourceName}Create` : `${instance.resourceName}Edit`;
        instance.properties = store.getState().forms[`RHForms`][instanceKey].properties; 
        return instance;
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Not using connect here to avoid rerendering of component on change of instance properties.
        this.props.handleSubmit(this.fetchStoreInstance());
    }

    handleDelete = (e: React.FormEvent) => {
        if (this.props.handleDelete && this.props.handleDelete instanceof Function) {
            this.props.handleDelete(this.fetchStoreInstance()); 
        }
    }

    render(): JSX.Element {
        return (
            <form onSubmit={this.handleSubmit}>
            <Grid>
                
                <FormInput 
                        type="number" 
                        propertyName="id"
                        model="RHForms.newsEdit.properties.id"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="author"
                        model="RHForms.newsEdit.properties.author"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="body"
                        model="RHForms.newsEdit.properties.body"    
                />
                
                <FormInput 
                        type="date" 
                        propertyName="dateCreated"
                        model="RHForms.newsEdit.properties.dateCreated"    
                />
                
                <FormInput 
                        type="date" 
                        propertyName="lastUpdated"
                        model="RHForms.newsEdit.properties.lastUpdated"    
                />
                
                <FormInput 
                        type="boolean" 
                        propertyName="publish"
                        model="RHForms.newsEdit.properties.publish"    
                />
                
                <FormInput 
                        type="date" 
                        propertyName="publishDate"
                        model="RHForms.newsEdit.properties.publishDate"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="subTitle"
                        model="RHForms.newsEdit.properties.subTitle"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="title"
                        model="RHForms.newsEdit.properties.title"    
                />
                
                <FormGroup>
                    <Col sm={4} smOffset={3}>
                        <Button style={{margin: '0px 10px'}} bsStyle="primary" type="submit">
                            Update
                        </Button>
                        <Button style={{margin: '0px 10px'}} bsStyle="danger" onClick={this.handleDelete}>
                            Delete
                        </Button>
                        <Link style={{margin: '0px 10px'}} className="btn btn-default" to={'/news/list'}>
                            Cancel
                        </Link>
                    </Col>
                </FormGroup>
                </Grid>
            </form>
        );    
    }
};
