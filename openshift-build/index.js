// Global Variables
APP_NAME='OpenShift-Build'

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
    // TODO

    // Return check data
    return context.github.checks.create(context.repo({
      name: APP_NAME,
      head_branch: headBranch,
      head_sha: headSha,
      status: 'completed',
      started_at: startTime,
      conclusion: 'success',
      completed_at: new Date(),
      output: {
        title: 'Probot check!',
        summary: 'The check has passed!'
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
    // TODO

    // Return check data
    return context.github.checks.create(context.repo({
      name: APP_NAME,
      head_branch: headBranch,
      head_sha: headSha,
      status: 'completed',
      started_at: startTime,
      conclusion: 'success',
      completed_at: new Date(),
      output: {
        title: 'Probot check!',
        summary: 'The check has passed!'
      }
    }))
  };

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
