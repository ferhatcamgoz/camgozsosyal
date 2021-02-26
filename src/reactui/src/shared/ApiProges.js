import React, {Component} from 'react';
import axios from "axios";


export function withApiProgess(WrappedComponenet,path) {
    return class ApiProges extends Component {

        state = {
            pandingApiCall: false
        };

        componentDidMount() {axios.interceptors.request.use((request => {
                this.updatePanginga(request.url, true);

                return request;
            }));
            axios.interceptors.response.use(response => {

                this.updatePanginga(response.config.url, false);

                return response;
            }, error => {
                this.updatePanginga(error.config.url, false);

                throw  error;
            });
        }


        updatePanginga(url, progess) {
            if (url == path) {
                this.setState({pandingApiCall: progess});
            }
        }


        render() {
            const {pendingApiCall}=this.state;
            return <WrappedComponenet pendingApiCall={pendingApiCall}/>;


        }
    }
}
