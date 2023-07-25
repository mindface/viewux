
export function fetchAction () {

  const getAction = async <T>(path:string) => {
    try {
      const res = await fetch(path)
      return await res.json()
    } catch (error) {
      console.log("///fetchAction-getActionでerrorです///")
      console.error(error)
    }
  }

  return {
    getAction
  }
}

export class FetchAPIs {
  constructor() {}

  public async getCustomerData() {
    const res = await fetchAction().getAction("/mainInfo.json")
    return res;
  }
  public async getMethods(customerId:string) {
    const res = await fetchAction().getAction("/methods.json")
    return res;
  }
  public async getTaskProcess(customerId:string) {
    const res = await fetchAction().getAction("/mainInfo.json")
    return res;
  }
  public async getPlanHistory(customerId:string) {
    const res = await fetchAction().getAction("/planHistory.json")
    return res;
  }
  public async getSimilarTask(categoryNmae:string) {
    const res = await fetchAction().getAction("/mainInfo.json")
    return res;
  }
}

