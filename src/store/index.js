import { createStore } from 'vuex';

export default createStore({
    state: {
        vueThisObj: null,
        endPoint : null,
        axiosRequest: {
            response: {}
        }
    },
    mutations: {
        fireToast(state, data) {
            state.vueThisObj.$toast.open({
                message: data.message,
                position: "top-right",
                type: data.type,
                duration: data.duration,
            });
        },
        setVueThisObj(state, data) {
            state.vueThisObj = data;
        },
        setEndPoint(state, data){
            state.endPoint = data;
        },
        changePage(state, data) {
            if (!data) {
                state.vueThisObj.$router.back();
            } else {
                state.vueThisObj.$router.push(data);
            }
        },
        makePostRequest(state, configParams) {
            const vm = this;
            const axiosRequestParams = configParams.axiosRequestParams;
 
            state.vueThisObj.axios
                .post(
                    axiosRequestParams.url,
                    axiosRequestParams.data,
                    axiosRequestParams.config
                )
                .then(function (data) {
                    console.log(data.data);
                    state.axiosRequest.response[axiosRequestParams.name] = {
                        responseData: data,
                        situation: "success",
                    };

                    if (axiosRequestParams.toastMessages) {
                        vm.dispatch("fireToast", {
                            message: axiosRequestParams.toastMessages.success,
                            type: "success",
                            duration: 2000
                        });
                    }

                    
                })
                .catch(function (thrown) {
                    if (thrown.__CANCEL__) {
                        if (axiosRequestParams.toastMessages) {
                            vm.dispatch("fireToast", {
                                message: axiosRequestParams.toastMessages.warning,
                                type: "warning",
                                duration: 2000
                            });
                        }
                    } else {
                        state.axiosRequest.response[axiosRequestParams.name] = {
                            responseData: [],
                            situation: "error",
                        };

                        if (axiosRequestParams.toastMessages) {
                            vm.dispatch("fireToast", {
                                message: axiosRequestParams.toastMessages.error,
                                type: "error",
                                duration: 2000
                            });
                        }
                    }
                });
        },
        makePutRequest(state, configParams) {
            const vm = this;
            const axiosRequestParams = configParams.axiosRequestParams;
 
            state.vueThisObj.axios
                .put(
                    axiosRequestParams.url,
                    axiosRequestParams.data,
                    axiosRequestParams.config
                )
                .then(function (data) {
                    console.log(data.data);
                    state.axiosRequest.response[axiosRequestParams.name] = {
                        responseData: data,
                        situation: "success",
                    };

                    if (axiosRequestParams.toastMessages) {
                        vm.dispatch("fireToast", {
                            message: axiosRequestParams.toastMessages.success,
                            type: "success",
                            duration: 2000
                        });
                    }

                    
                })
                .catch(function (thrown) {
                    if (thrown.__CANCEL__) {
                        if (axiosRequestParams.toastMessages) {
                            vm.dispatch("fireToast", {
                                message: axiosRequestParams.toastMessages.warning,
                                type: "warning",
                                duration: 2000
                            });
                        }
                    } else {
                        state.axiosRequest.response[axiosRequestParams.name] = {
                            responseData: [],
                            situation: "error",
                        };

                        if (axiosRequestParams.toastMessages) {
                            vm.dispatch("fireToast", {
                                message: axiosRequestParams.toastMessages.error,
                                type: "error",
                                duration: 2000
                            });
                        }
                    }
                });
        },
        makeGetRequest(state, configParams) {
            const vm = this;
            const axiosRequestParams = configParams.axiosRequestParams;
            state.vueThisObj.axios
                .get(
                    axiosRequestParams.url,
                    axiosRequestParams.config
                )
                .then(function (data) {
                    console.log(data.data);
                    state.axiosRequest.response[axiosRequestParams.name] = {
                        responseData: data,
                        situation: "success",
                    };

                    if (axiosRequestParams.toastMessages) {
                        vm.dispatch("fireToast", {
                            message: axiosRequestParams.toastMessages.success,
                            type: "success",
                            duration: 2000
                        });
                    }

                    
                })
                .catch(function (thrown) {
                    if (thrown.__CANCEL__) {
                        if (axiosRequestParams.toastMessages) {
                            vm.dispatch("fireToast", {
                                message: axiosRequestParams.toastMessages.warning,
                                type: "warning",
                                duration: 2000
                            });
                        }
                    } else {
                        state.axiosRequest.response[axiosRequestParams.name] = {
                            responseData: [],
                            situation: "error",
                        };
                        if (axiosRequestParams.toastMessages) {
                            vm.dispatch("fireToast", {
                                message: axiosRequestParams.toastMessages.error,
                                type: "error",
                                duration: 2000
                            });
                        }
                    }
                });
        }
    },
    actions: {
        fireToast({ commit }, data) {
            commit("fireToast", data);
        },
        changePage({ commit }, data) {
            commit("changePage", data);
        },
        setVueThisObj({ commit }, data) {
            commit("setVueThisObj", data);
        },
        setEndPoint({commit}, data){
            commit("setEndPoint",data);
        },
        makePostRequest({ commit }, data) {
            commit("makePostRequest", data);
        },
        makePutRequest({ commit }, data) {
            commit("makePutRequest", data);
        },
        makeGetRequest({ commit }, data) {
            commit("makeGetRequest", data);
        }
    },
    getters: {
        axiosRequestResponse(state) {
            return state.axiosRequest.response;
        },
        getRequestEndPoint(state) {
            return state.endPoint;
        }
    },
    modules: {}
});
