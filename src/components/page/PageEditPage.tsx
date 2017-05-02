import * as React from 'react';
import * as Radium from 'radium';
import {PageModel} from '../../models/PageModel';
import {FormGroup, Col, Button, Grid} from 'react-bootstrap';
import {Link} from 'react-router';
import {FormInput, IInstancePageProps} from 'react-hero';
import {store} from '../../store';

export interface IPageEditPageProps extends IInstancePageProps {
    handleSubmit: (instance: PageModel) => void;
    handleDelete: (instance: PageModel) => void;
    instance: PageModel;
    isCreatePage: boolean;
}

@Radium
export class PageEditPage extends React.Component<IPageEditPageProps, void> { 

    static resourceName: string = 'page';
    
    fetchStoreInstance = (): PageModel => {
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
                        model="RHForms.pageEdit.properties.id"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="author"
                        model="RHForms.pageEdit.properties.author"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="body"
                        model="RHForms.pageEdit.properties.body"    
                />
                
                <FormInput 
                        type="date" 
                        propertyName="dateCreated"
                        model="RHForms.pageEdit.properties.dateCreated"    
                />
                
                <FormInput 
                        type="date" 
                        propertyName="lastUpdated"
                        model="RHForms.pageEdit.properties.lastUpdated"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="pageLayout"
                        model="RHForms.pageEdit.properties.pageLayout"    
                />
                
                <FormInput 
                        type="boolean" 
                        propertyName="publish"
                        model="RHForms.pageEdit.properties.publish"    
                />
                
                <FormInput 
                        type="date" 
                        propertyName="publishedDate"
                        model="RHForms.pageEdit.properties.publishedDate"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="subTitle"
                        model="RHForms.pageEdit.properties.subTitle"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="title"
                        model="RHForms.pageEdit.properties.title"    
                />
                
                <FormGroup>
                    <Col sm={4} smOffset={3}>
                        <Button style={{margin: '0px 10px'}} bsStyle="primary" type="submit">
                            Update
                        </Button>
                        <Button style={{margin: '0px 10px'}} bsStyle="danger" onClick={this.handleDelete}>
                            Delete
                        </Button>
                        <Link style={{margin: '0px 10px'}} className="btn btn-default" to={'/page/list'}>
                            Cancel
                        </Link>
                    </Col>
                </FormGroup>
                </Grid>
            </form>
        );    
    }
};
