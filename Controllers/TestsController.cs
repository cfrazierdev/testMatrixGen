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
    public class TestsController : ApiController
    {
        private IRegressionMatrixService regressionMatrixService;
        private IRequestResponseUtility requestResponseUtility;

        public TestsController(IRegressionMatrixService regressionMatrixService,
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
                var tests = regressionMatrixService.GetTests();

                return requestResponseUtility.ReturnSuccessOkay("Tests GET call successful.", tests);
            }
            catch (Exception ex)
            {
                return requestResponseUtility.ReturnErrorInternalServer("Tests GET call failed.");
            }
        }
    }
}
