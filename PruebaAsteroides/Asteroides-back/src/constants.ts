export const saltOrRounds = 10;
export const ApiUrl = (startDate?: string, endDate?: string) => {
    const defaultStartDate = '2015-09-07'
    const defaultEndDate = '2015-09-08'
    return `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate ?? defaultStartDate}&end_date=${endDate ?? defaultEndDate}&api_key=DEMO_KEY`
}
export const ApiUrlById = (id: string) => {
    return `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=DEMO_KEY`
}