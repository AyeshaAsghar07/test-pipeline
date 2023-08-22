# Serverless Starter Pack #

- [Useage](#useage)
- [Included Scripts](#included-scripts)
  - [Note on Arguments](#note-on-arguments)
- [Useage](#useage-1)
- [Included Scripts](#included-scripts-1)
  - [Note on Arguments](#note-on-arguments-1)
- [Troubleshooting](#troubleshooting)

## Useage ##

1. Copy the contents of this folder to your new service
2. run `npm install` to download and install the most recent (*semver compatible*) versions of required packages
3. Change **SERVERLESS-STARTER-PACK** in `package.json` to the name of your neew project
4. add your functions and configuration to `serverless.yaml`
5. use `npm run deploy` to deploy and for access to serverless directly use `npm run serverless`

## Included Scripts ##

These scripts can be run with `npm run <script>`

### Note on Arguments ###

> You can pass options to underlying commands by separating the `npm run` command and your options with `--`
>
> For example `npm run invoke -- handler -p s3.event.json` this equates to `serverless invoke -f handler -p s3.event.json`
> Another example `npm run deploy -- --stage prod` **=>** `serverless deploy --stage prod`

| script          | outcome                         | Notes                                                           |
| :-------------- | :------------------------------ | --------------------------------------------------------------- |
| sls             | `serverless`                    | sls is shorthand for serverless                                 |
| serverless      | `sls`                           |                                                                 |
| deploy          | `sls deploy`                    | `npm test` is run before this                                   |
| deploy:function | `sls deploy -f`                 | pass function name as arguments see [above](#note-on-arguments) |
| deploy:config   | `sls deploy --update-config -f` | pass function name as arguments see [above](#note-on-arguments) |
| invoke          | `sls invoke -f`                 | pass function name as arguments see [above](#note-on-arguments) |
| invoke:local    | `sls invoke local -f`           | pass function name as arguments see [above](#note-on-arguments) |
