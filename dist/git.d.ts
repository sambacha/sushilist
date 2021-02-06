/**
 * Fetch a Git repository and return the file system path of the folder containing the repository.
 *
 * @return {Promise<void>}
 */
export declare const fetchRepository: (repoUrl: string, outputPath: string) => Promise<void>;
