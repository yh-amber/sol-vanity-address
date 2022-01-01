let terminated: boolean = false;

export function changeWorkerStatus(status: boolean) {
  terminated = status;
}

export function getWorkerStatus() {
  return terminated;
}