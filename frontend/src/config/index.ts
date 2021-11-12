const local = {
    api: '',
};

const staging = {
    api: '',
};

let envConfig = local;

if (process.env.REACT_APP_STAGE === 'staging') {
    envConfig = staging;
} else {
    envConfig = local;
}

const environment = envConfig;

export default environment;
