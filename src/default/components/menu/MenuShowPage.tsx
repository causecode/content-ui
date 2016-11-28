import * as React from 'react';
import {Table} from 'react-bootstrap';
import {ModelPropTypes, IInstancePageProps} from 'react-hero';
import {MenuModel} from '../../../models/MenuModel';

export class MenuShowPage extends React.Component<IInstancePageProps, void> {

    static resourceName: string = 'menu';
    
    static defaultProps: IInstancePageProps = {
        instance: new MenuModel({})
    };

    render(): JSX.Element {
        const {instance} =  this.props;
        return (
            <Table responsive bordered>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr>
                        <td><strong>id</strong></td>
                        <td>{instance.properties.id.toString()}</td>
                    </tr>
                    
                    <tr>
                        <td><strong>dateCreated</strong></td>
                        <td>{instance.properties.dateCreated.toString()}</td>
                    </tr>
                    
                    <tr>
                        <td><strong>lastUpdated</strong></td>
                        <td>{instance.properties.lastUpdated.toString()}</td>
                    </tr>
                    
                    <tr>
                        <td><strong>name</strong></td>
                        <td>{instance.properties.name.toString()}</td>
                    </tr>
                    
                    <tr>
                        <td><strong>roles</strong></td>
                        <td>{instance.properties.roles.toString()}</td>
                    </tr>
                    
                    <tr>
                        <td><strong>showOnlyWhenLoggedIn</strong></td>
                        <td>{instance.properties.showOnlyWhenLoggedIn.toString()}</td>
                    </tr>
                    
                </tbody>
            </Table>
        );
    }
}
