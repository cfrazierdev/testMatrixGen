using RegressionMatrix.Models;
using RegressionMatrix.Services;
using RegressionMatrix.Utilities;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RegressionMatrix.Controllers
{
    [EnableCors(origins: "http://localhost:5556", headers: "*", methods: "*")]
    public class BrowsersController : ApiController
    {
        private IRegressionMatrixService regressionMatrixService;
        private IRequestResponseUtility requestResponseUtility;

        public BrowsersController(IRegressionMatrixService regressionMatrixService,
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
                var browsers = this.regressionMatrixService.GetBrowsers();

                return requestResponseUtility.ReturnSuccessOkay("Browsers GET call successful.", browsers);
            }
            catch (Exception ex)
            {
                return requestResponseUtility.ReturnErrorInternalServer("Browsers GET call failed." + ex);
            }
        }
    }
}
