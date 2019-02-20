# github-auditlogs-node
AWS Lambda function to get Audit logs from GitHub.com webhooks.

# Dependency
Node.js v8.10 higher is required

# Usage
## AWS Lambda function
Create an AWS Lambda function using index.js.
### Set Environment
`GITHUB_WEBHOOK_SECRET` Set 'secret token' you specified in github's management console to environment variable
[see also](https://developer.github.com/webhooks/securing/)

## Amazon API Gateway
To enable custom headers used by Github webhooks, set to Amazon API Gateway.
[see also](https://aws.amazon.com/premiumsupport/knowledge-center/custom-headers-api-gateway-lambda/?nc1=h_ls)

# Licence
This software is released under the MIT License, see LICENSE.

# Authors
* [facebook](https://www.facebook.com/kenji.nishii.7)
* [twitter](https://twitter.com/kenji_toforone)

# References
* [github webhooks reference](https://developer.github.com/webhooks/)

