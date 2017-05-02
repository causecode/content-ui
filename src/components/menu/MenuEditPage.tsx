import * as React from 'react';
import {MenuModel} from '../../models/MenuModel';
import {FormGroup, Col, Button, Grid} from 'react-bootstrap';
import {Link} from 'react-router';
import {FormInput, IInstancePageProps} from 'react-hero';
import {store} from '../../store';

export interface IMenuEditPageProps extends IInstancePageProps {
    handleSubmit: (instance: MenuModel) => void;
    handleDelete: (instance: MenuModel) => void;
    instance: MenuModel;
    isCreatePage: boolean;
}

export class MenuEditPage extends React.Component<IMenuEditPageProps, void> { 

    static resourceName: string = 'menu';
    
    fetchStoreInstance = (): MenuModel => {
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
                        model="RHForms.menuEdit.properties.id"    
                />
                
                <FormInput 
                        type="date" 
                        propertyName="dateCreated"
                        model="RHForms.menuEdit.properties.dateCreated"    
                />
                
                <FormInput 
                        type="date" 
                        propertyName="lastUpdated"
                        model="RHForms.menuEdit.properties.lastUpdated"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="name"
                        model="RHForms.menuEdit.properties.name"    
                />
                
                <FormInput 
                        type="text" 
                        propertyName="roles"
                        model="RHForms.menuEdit.properties.roles"    
                />
                
                <FormInput 
                        type="boolean" 
                        propertyName="showOnlyWhenLoggedIn"
                        model="RHForms.menuEdit.properties.showOnlyWhenLoggedIn"    
                />
                
                <FormGroup>
                    <Col sm={4} smOffset={3}>
                        <Button style={{margin: '0px 10px'}} bsStyle="primary" type="submit">
                            Update
                        </Button>
                        <Button style={{margin: '0px 10px'}} bsStyle="danger" onClick={this.handleDelete}>
                            Delete
                        </Button>
                        <Link style={{margin: '0px 10px'}} className="btn btn-default" to={'menu/list'}>
                            Cancel
                        </Link>
                    </Col>
                </FormGroup>
                </Grid>
            </form>
        );    
    }
};
