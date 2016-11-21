export class ProductRelease {
  ProductReleaseId: string;
  ProductReleaseVersion: string;

  constructor(params: any) {
    this.ProductReleaseVersion = params.ProductReleaseVersion;
  }
}
