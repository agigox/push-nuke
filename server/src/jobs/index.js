import updateRteTokenJob from './updateRteToken';

const jobs = [updateRteTokenJob];

export const initJobs = (environment) => {
  const jobIds = jobs.map((job) =>
    setInterval(() => job.f(environment), job.interval),
  );
  // eslint-disable-next-line no-param-reassign
  environment.jobIds = jobIds;
};

export const killJobs = ({ jobIds }) => {
  jobIds.forEach((jobId) => clearInterval(jobId));
};
