// Global Variables
APP_NAME=process.env.APP_NAME;
TEST_COMMAND=process.env.TEST_COMMAND;
const shell = require('shelljs');
var rimraf = require("rimraf");
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

    let passed = 'failure';
    let data = 'N/A';
    try {
      // Clone the repo first
      shell.exec(`git clone ${pr.head.repo.git_url} ./temp`);

      // Move into our temp directory
      shell.cd('temp');

      // Checkout with our Sha
      shell.exec(`git checkout ${headSha}`);

      // Perform tests and return
      const response = await perform_test();
      passed = response[0];
      data = response[1];
      return await context.github.checks.create(context.repo({
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
    catch {
      return await context.github.checks.create(context.repo({
        name: APP_NAME,
        head_branch: headBranch,
        head_sha: headSha,
        status: 'completed',
        started_at: startTime,
        conclusion: passed,
        completed_at: new Date(),
        output: {
          title: 'OpenShift-Build Check',
          summary: 'Error when cloning or running tests.'
        }
      }))
    }
    finally {
      // Delete our cloned repo
      shell.cd('..');
      rimraf("temp", function () { console.log("Deleted cloned repo"); });
    }
  }

  // When someone adds a commit to a Pull Request
  app.on(['check_suite.requested', 'check_run.rerequested'], check_suite);
  async function check_suite (context) {
     // Identify start time
    const startTime = new Date();

    // Extract relevant information
    const pr = context.payload.pull_request;
    const headBranch = pr.head.ref;
    const headSha = pr.head.sha;

    let passed = 'failure';
    let data = 'N/A';
    try {
      // Clone the repo first
      shell.exec(`git clone ${pr.head.repo.git_url} ./temp`);

      // Move into our temp directory
      shell.cd('temp');

      // Checkout with our Sha
      shell.exec(`git checkout ${headSha}`);

      // Perform tests and return
      const response = await perform_test();
      passed = response[0];
      data = response[1];
      return await context.github.checks.create(context.repo({
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
    catch {
      return await context.github.checks.create(context.repo({
        name: APP_NAME,
        head_branch: headBranch,
        head_sha: headSha,
        status: 'completed',
        started_at: startTime,
        conclusion: passed,
        completed_at: new Date(),
        output: {
          title: 'OpenShift-Build Check',
          summary: 'Error when cloning or running tests.'
        }
      }))
    }
    finally {
      // Delete our cloned repo
      shell.cd('..');
      rimraf("temp", function () { console.log("Deleted cloned repo"); });
    }
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
