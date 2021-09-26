export class CityWeather {
  constructor(
    public latitude: number,
    public longitude: number,
    public cityName: string,
    public currentCelsious: number,
    public currentMain: string,
    public currentIcon: string,
    public daily: Object[]
  ) {}
}
