using System;
using System.Net;
using System.Net.Http;

namespace RegressionMatrix.Utilities
{
    public interface IRequestResponseUtility
    {
        HttpResponseMessage CreateResponse(HttpStatusCode code);

        HttpResponseMessage CreateErrorResponse(HttpStatusCode code, Exception exp);

        void Bind(Func<HttpRequestMessage> func);

        HttpResponseMessage ReturnSuccessOkay(string message, object content = null);
        HttpResponseMessage ReturnSuccessCreated(string message, object content = null);
        HttpResponseMessage ReturnSuccessAccepted(string message, object content = null);
        HttpResponseMessage ReturnSuccessNoContent();
        HttpResponseMessage ReturnSuccessDuplicateResult(string message, object content = null);

        HttpResponseMessage ReturnErrorBadRequest(string message, object content = null);
        HttpResponseMessage ReturnErrorForbidden(string message, object content = null);
        HttpResponseMessage ReturnErrorNotFound(string message, object content = null);
        HttpResponseMessage ReturnErrorUnexpectedResult(string message, object content = null);

        HttpResponseMessage ReturnErrorInternalServer(string message, Exception exception = null);
    }
}
