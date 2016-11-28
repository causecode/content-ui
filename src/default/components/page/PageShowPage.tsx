import * as React from 'react';
import {Table} from 'react-bootstrap';
import {ModelPropTypes, IInstancePageProps} from 'react-hero';
import {PageModel} from '../../../models/PageModel';

export class PageShowPage extends React.Component<IInstancePageProps, void> {

    static resourceName: string = 'page';
    
    static defaultProps: IInstancePageProps = {
        instance: new PageModel({})
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
                        <td><strong>author</strong></td>
                        <td>{instance.properties.author.toString()}</td>
                    </tr>
                    
                    <tr>
                        <td><strong>body</strong></td>
                        <td>{instance.properties.body.toString()}</td>
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
                        <td><strong>pageLayout</strong></td>
                        <td>{instance.properties.pageLayout.toString()}</td>
                    </tr>
                    
                    <tr>
                        <td><strong>publish</strong></td>
                        <td>{instance.properties.publish.toString()}</td>
                    </tr>
                    
                    <tr>
                        <td><strong>publishedDate</strong></td>
                        <td>{instance.properties.publishedDate.toString()}</td>
                    </tr>
                    
                    <tr>
                        <td><strong>subTitle</strong></td>
                        <td>{instance.properties.subTitle.toString()}</td>
                    </tr>
                    
                    <tr>
                        <td><strong>title</strong></td>
                        <td>{instance.properties.title.toString()}</td>
                    </tr>
                    
                </tbody>
            </Table>
        );
    }
}
