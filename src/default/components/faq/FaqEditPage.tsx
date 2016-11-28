import * as React from 'react';
import {FaqModel} from '../../../models/FaqModel';
import {ControlLabel, FormGroup, Col, Button, Grid} from 'react-bootstrap';
import {Link} from 'react-router';
import {FormInput, IInstancePageProps, initializeFormWithInstance} from 'react-hero';
import {store} from '../../../store';

export interface IFaqEditPageProps extends IInstancePageProps {
    handleSubmit: (instance: FaqModel) => void;
    handleDelete: (instance: FaqModel) => void;
    instance: FaqModel;
    isCreatePage: boolean;
}

export class FaqEditPage extends React.Component<IFaqEditPageProps, void> { 

    static resourceName: string = 'faq';
    
    fetchStoreInstance = (): FaqModel => {
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
                        model="RHForms.faqEdit.properties.id"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="author"
                        model="RHForms.faqEdit.properties.author"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="body"
                        model="RHForms.faqEdit.properties.body"    
                />
                
                <FormInput 
                        type="date" 
                        propertyName="dateCreated"
                        model="RHForms.faqEdit.properties.dateCreated"    
                />
                
                <FormInput 
                        type="date" 
                        propertyName="lastUpdated"
                        model="RHForms.faqEdit.properties.lastUpdated"    
                />
                
                <FormInput 
                        type="boolean" 
                        propertyName="publish"
                        model="RHForms.faqEdit.properties.publish"    
                />
                
                <FormInput 
                        type="date" 
                        propertyName="publishDate"
                        model="RHForms.faqEdit.properties.publishDate"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="subTitle"
                        model="RHForms.faqEdit.properties.subTitle"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="title"
                        model="RHForms.faqEdit.properties.title"    
                />
                
                <FormGroup>
                    <Col sm={4} smOffset={3}>
                        <Button style={{margin: '0px 10px'}} bsStyle="primary" type="submit">
                            Update
                        </Button>
                        <Button style={{margin: '0px 10px'}} bsStyle="danger" onClick={this.handleDelete}>
                            Delete
                        </Button>
                        <Link style={{margin: '0px 10px'}} className="btn btn-default" to={'/faq/list'}>
                            Cancel
                        </Link>
                    </Col>
                </FormGroup>
                </Grid>
            </form>
        );    
    }
};
