using RegressionMatrix.Services;
using RegressionMatrix.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RegressionMatrix.Controllers
{
    [EnableCors(origins: "http://localhost:5556", headers: "*", methods: "*")]
    public class ProductReleasesController : ApiController
    {
        private IRegressionMatrixService regressionMatrixService;
        private IRequestResponseUtility requestResponseUtility;

        public ProductReleasesController(IRegressionMatrixService regressionMatrixService,
                                  IRequestResponseUtility requestResponseUtility)
        {
            this.regressionMatrixService = regressionMatrixService;
            this.requestResponseUtility = requestResponseUtility;
            this.requestResponseUtility.Bind(() => Request);
        }

        public HttpResponseMessage Get()
        {
            try
            {
                var productReleases = regressionMatrixService.GetProductReleases();

                return requestResponseUtility.ReturnSuccessOkay("Product releases GET call successful.", productReleases);
            }
            catch (Exception ex)
            {
                return requestResponseUtility.ReturnErrorInternalServer("Product releases GET call failed. " + ex);
            }
        }
    }
}
