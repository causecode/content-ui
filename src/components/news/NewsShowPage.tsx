import * as React from 'react';
import {Table} from 'react-bootstrap';
import {IInstancePageProps} from 'react-hero';

export class NewsShowPage extends React.Component<IInstancePageProps, void> {

    static resourceName: string = 'news';

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
                        <td><strong>publish</strong></td>
                        <td>{instance.properties.publish.toString()}</td>
                    </tr>
                    
                    <tr>
                        <td><strong>publishDate</strong></td>
                        <td>{instance.properties.publishDate.toString()}</td>
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
