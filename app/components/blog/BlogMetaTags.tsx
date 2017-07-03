import * as React from 'react';
import * as Radium from 'radium';
import {store} from '../../store';
import {CSS} from '../../interfaces';
import {textAlignRight, centerStyle, firstThemeColor} from '../../constants';
import {FormControl, Row, Col, FontAwesomeRadium, Grid, HelpBlock} from '../reusable-components/reusableComponents';
const ReduxForm: any = require<any>('redux-form');

export interface IBlogMetaTagProps {
    metaTypeList: string[];
}

export interface IBlogMetaTagsState {
    metaTagFields?: JSX.Element[];
}

@Radium
export class BlogMetaTagsImpl extends React.Component<IBlogMetaTagProps, IBlogMetaTagsState> {

    // Type Object is intentional here
    private fieldsTracker: Object = {};
    private selectedValue: string = '';

    constructor() {
        super();
        this.state = {metaTagFields: []};
    }

    renderOptions = (): JSX.Element[] => {
        if (this.props.metaTypeList && this.props.metaTypeList.length > 0) {

            let options: JSX.Element[] = [];

            this.props.metaTypeList.forEach((item: string, index: number): void => {
                options.push(
                    <option key={index} value={item}>{item}</option>
                );
            });
            return options;
        }
    }

    initializeFieldsTracker = (): void => {
        if (Object.keys(this.fieldsTracker).length === 0) {
            if (this.props.metaTypeList && this.props.metaTypeList.length > 0) {
                this.props.metaTypeList.forEach((item: string): void => {
                    this.fieldsTracker[item] = false;
                });
                this.selectedValue = this.selectedValue ||  this.props.metaTypeList[0];
            }
        }
    }

    addMetaField = (): void => {
        if (Object.keys(this.fieldsTracker).length === 0) {
            this.initializeFieldsTracker();
        }

        if (!this.fieldsTracker[this.selectedValue]) {
            let field: JSX.Element = (
                <Row key={this.selectedValue} style={fieldStyle}>
                    <Col sm={3} style={textAlignRight}>
                        <label><strong>{this.selectedValue}</strong></label>
                    </Col>
                    <Col sm={4}>
                        <ReduxForm.Field
                                type="text"
                                component="textarea"
                                style={taStyle}
                                name={this.selectedValue}
                        />
                    </Col>
                    <Col sm={1}>
                        <FontAwesomeRadium
                                name="close"
                                onClick={this.resetField}
                                id={this.selectedValue}
                                style={closeBtnStyle}
                        />
                    </Col>
                </Row>
            );

            this.fieldsTracker[this.selectedValue] = true;

            this.setState({
                metaTagFields: [...this.state.metaTagFields, field],
            });
        }
    }

    resetField = (event: React.FormEvent): void => {

        let index: number;
        this.state.metaTagFields.every((item: JSX.Element, itemIndex: number): boolean => {
            if (item.key === event.target[`id`]) {
                index = itemIndex;
                return false;
            }
            return true;
        });

        this.setState({
            metaTagFields: [
                ...this.state.metaTagFields.slice(0, index),
                ...this.state.metaTagFields.slice(index + 1),
            ],
        });
        this.fieldsTracker[event.target[`id`]] = false;
        store.dispatch(ReduxForm.change('blogMetaTags', event.target[`id`], ''));
    }

    handleChange = (event: React.FormEvent): void => {
        this.selectedValue = event.target[`value`];
    }

    render(): JSX.Element {
        return (
            <Grid>
                <Row>
                    <Col sm={3}>
                        <h2 style={[centerStyle, headerStyle]}>Meta Tags</h2>
                    </Col>
                    <Col sm={4}>
                        <FormControl
                                style={selectStyle}
                                componentClass="select"
                                onChange={this.handleChange}>
                            {this.renderOptions()}
                        </FormControl>
                        <HelpBlock style={bottomMargin}>Use Meta Tags to add more information about blog.</HelpBlock>
                    </Col>
                    <Col sm={2}>
                        <span style={addStyle}>
                            <FontAwesomeRadium id="add" name="plus" style={topMargin} onClick={this.addMetaField} />
                        </span>
                    </Col>
                </Row>
                <Row>
                    {this.state.metaTagFields}
                </Row>
            </Grid>
        );
    }
}

export const BlogMetaTags: React.ComponentClass<IBlogMetaTagProps> = ReduxForm.reduxForm({
    form: 'blogMetaTags',
})(BlogMetaTagsImpl);

const selectStyle: CSS = {
    margin: '10% 0px 0% 1%',
};

const addStyle: CSS = {
    color: firstThemeColor,
    fontSize: '25px',
    ':hover': {
        transition: 'all .4s ease-in-out',
        textDecoration: 'none',
        color: '#a26f02',
        background: 'initial',
    },
};

const topMargin: CSS = {
    margin: '40px 0px 0px',
};

const bottomMargin: CSS = {
    margin: '0px 0px 10%',
};

const fieldStyle: CSS = {
    margin: '0% 0% 3%',
};

const taStyle: CSS = {
    width: '100%',
};

const closeBtnStyle: CSS = {
    float: 'right',
    fontSize: '14px',
    lineHeight: '1',
    color: '#000',
    textShadow: '0 1px 0 #fff',
    opacity: .2,
    cursor: 'pointer',
    border: '0px',
    ':hover': {
        color: '#000',
        opacity: .5,
    },
};

const headerStyle: CSS = {
    fontWeight: 700,
};
