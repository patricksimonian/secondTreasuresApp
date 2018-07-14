import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../auxillary/auxillary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    requestInterceptor = null;
    responseInterceptor = null;
    componentWillMount () {
      this.requestInterceptor = axios.interceptors.request.use((request) => {
        this.setState({error: null});
        return request;
      });
      this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({error});
        return error;
      });
    }

    //remove old interceptors when this component unmounts to prevent
    //memory leaks
    componentWillUnmount () {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render() {
      let errorMessages = this.state.error ? this.state.error.message : null;
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {errorMessages}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;
