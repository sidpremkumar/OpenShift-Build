// Global Variables
APP_NAME=process.env.APP_NAME;
TEST_COMMAND=process.env.TEST_COMMAND;
const childProcess = require("child_process");

module.exports = app => {
  // When a Pull Request is opened or Re-Opened
  app.on(['pull_request.opened', 'pull_request.reopened'], pull_request);
  async function pull_request (context) {
    // Identify start time
    const startTime = new Date();

    // Extract relevant information
    const pr = context.payload.pull_request;
    const headBranch = pr.head.ref;
    const headSha = pr.head.sha;

    // Perform our tests and get the result
    const response = await perform_test();
    const passed = response[0];
    const data = response[1];

    // Return check data
    return context.github.checks.create(context.repo({
      name: APP_NAME,
      head_branch: headBranch,
      head_sha: headSha,
      status: 'completed',
      started_at: startTime,
      conclusion: passed,
      completed_at: new Date(),
      output: {
        title: 'OpenShift-Build Check',
        summary: data
      }
    }))
  }

  // When someone adds a commit to a Pull Request
  app.on(['check_suite.requested', 'check_run.rerequested'], check_suite);
  async function check_suite (context) {
    // Identify start time
    const startTime = new Date();

    // Extract relevant information
    const check_suite = context.payload.check_run;
    const headBranch = check_suite.head_branch;
    const headSha = check_suite.head_sha;

    // Perform our tests and get the result
    const response = await perform_test();
    const passed = response[0];
    const data = response[1];

    // Return check data
    return context.github.checks.create(context.repo({
      name: APP_NAME,
      head_branch: headBranch,
      head_sha: headSha,
      status: 'completed',
      started_at: startTime,
      conclusion: passed,
      completed_at: new Date(),
      output: {
        title: 'OpenShift-Build Check',
        summary: data
      }
    }))
  }

  function perform_test(){
    return new Promise(function(resolve, reject) {
     childProcess.exec(TEST_COMMAND, function(error, standardOutput, standardError) {
        if (error) {
          reject();
          return;
        }
        if (standardError) {
          reject(standardError);
          return;
        }
        resolve(standardOutput.split("\n"));
      });
    })
  }
};
