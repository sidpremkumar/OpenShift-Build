# OpenShift Bild

> A GitHub App built with [Probot](https://github.com/probot/probot) that Build and test GitHub code in OpenShift

## Setup
1 - First set up your WebHook at [smee.io](https://smee.io/). Save this URL as you will use it later. 

2 - Then create your GitHub app [here](https://github.com/settings/apps). Enter the WebHook from (1), enter a WebHook secret and download a private key.

3 - Modify `.env` with relevant information and add the private key under `/openshift-build/`

4 - TODO: EDIT TESTS 

5 - Install dependencies and start:

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## License

[ISC](LICENSE) © 2019 Sidhartha Premkumar <spremkum@redhat.com>
