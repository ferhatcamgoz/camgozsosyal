import React, {Component} from 'react';
import axios from "axios";


export function withApiProgess(WrappedComponenet,path) {
    return class ApiProges extends Component {
        static displayName="Apiprogessler("+WrappedComponenet.name+")";
        state = {
            pandingApiCall: false
        };

        componentDidMount() {axios.interceptors.request.use((request => {
           this.requestInterceptor= this.updatePanginga(request.url, true);

            return request;
        }));
            this.responseInterceptor= axios.interceptors.response.use(response => {

                this.updatePanginga(response.config.url, false);

                return response;
            }, error => {
                this.updatePanginga(error.config.url, false);

                throw  error;
            });
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }


        updatePanginga(url, progess) {
            if (url == path) {
                this.setState({pandingApiCall: progess});
            }
        }


        render() {
            const {pandingApiCall}=this.state;
            return <WrappedComponenet pandingApiCall={pandingApiCall} {... this.props}/>;


        }
    }
}