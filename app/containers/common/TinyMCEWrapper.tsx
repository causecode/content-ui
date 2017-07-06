import * as React from 'react';
import {IDispatch} from 'react-hero';
import {connect, MapDispatchToPropsFunction, MapStateToProps} from 'react-redux';
import {IDispatchProps, CSS} from '../../interfaces';
const {actions} = require<any>('react-redux-form');
const TinyMCE = require<any>('react-tinymce-input');

export interface ITinyMCEStateProps {
    value?: string;
}

export interface ITinyMCEProps extends IDispatchProps, ITinyMCEStateProps {
    model?: string;
    style?: CSS;
}

class TinyMCEWrapperImpl extends React.Component<ITinyMCEProps, void> {

    handleChange = (value: string): void => {
        this.props.saveData(this.props.model, value);
    }

    render(): JSX.Element {
        return(
            <div style={this.props.style ? this.props.style : container}>
                <TinyMCE
                        value={this.props.value}
                        tinymceConfig={{
                            plugins:[
                                'advlist autolink lists link image charmap print',
                                'preview hr anchor pagebreak searchreplace wordcount visualblocks',
                                'insertdatetime media nonbreaking save table contextmenu directionality',
                                'emoticons template paste textcolor colorpicker textpattern imagetools',
                                'codesample toc visualchars code fullscreen',
                            ],
                            toolbar: [
                                `undo redo | styleselect | bold italic | alignleft aligncenter alignright
                                alignjustify | bullist numlist outdent indent | link, code preview fullscreen |
                                forecolor backcolor`,
                            ],
                            height: '300px',
                        }}
                        onChange={this.handleChange}
                />
            </div>
        );
    }
}

let mapStateToProps: MapStateToProps<ITinyMCEStateProps, ITinyMCEProps> =
    (state: {forms}, ownProps: ITinyMCEProps): {value: string} => {

    let data: string = state.forms || {};

    ownProps.model.split('.').forEach((prop: any) => {
        data = data.hasOwnProperty(prop) ? data[prop] : '';
    });

    return {
        value: data,
    };
};

let mapDispatchToProps: MapDispatchToPropsFunction<IDispatchProps, ITinyMCEProps> =
        (dispatch: IDispatch): IDispatchProps => {
    return {
        saveData(model: string, value: string): void {
            dispatch(actions.change(model, value));
        },
    };
};

export const TinyMCEWrapper: React.ComponentClass<ITinyMCEProps> =
    connect(mapStateToProps, mapDispatchToProps)(TinyMCEWrapperImpl);

const container: CSS = {
    minHeight: '300px',
};
