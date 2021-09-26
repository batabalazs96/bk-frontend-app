export class OpenWeatherResponse {
  constructor(
    public latitude: number,
    public longitude: number,
    public celsious: number,
    public main: string,
    public icon: string,
    public daily: Object[]
  ) {}
}
