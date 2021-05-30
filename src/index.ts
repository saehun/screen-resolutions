import { promisify } from 'util';
import { exec as _exec } from 'child_process';

const exec = promisify(_exec);

export interface Resolution {
  w: number;
  h: number;
  monitor: string;
}

const resolverMap: Partial<Record<typeof process.platform, () => Promise<Resolution[]>>> = {
  darwin: async () => {
    const { stdout } = await exec('system_profiler SPDisplaysDataType');
    const regex = new RegExp(/Resolution: (\d+?) x (\d+?) (.*)/);
    const resolutions: Resolution[] = [];
    for (const line of stdout.split('\n')) {
      const parsed = regex.exec(line);
      if (parsed) {
        resolutions.push({
          w: parseInt(parsed[1]),
          h: parseInt(parsed[2]),
          monitor: parsed[3],
        });
      }
    }

    return resolutions;
  },
};

export async function resolutions(): Promise<Resolution[]> {
  const resolve = resolverMap[process.platform];
  if (resolve === undefined) {
    throw new Error(`Platform not supported: ${process.platform}`);
  }
  return resolve();
}

export default resolutions;
