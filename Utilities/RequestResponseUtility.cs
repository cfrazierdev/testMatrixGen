using System;
using System.Net;
using System.Net.Http;

namespace RegressionMatrix.Utilities
{
    public class RequestResponseUtility : IRequestResponseUtility
    {
        private Func<HttpRequestMessage> binder;

        public HttpResponseMessage CreateResponse(HttpStatusCode code)
        {
            return Request.CreateResponse(code);
        }

        public HttpResponseMessage CreateErrorResponse(HttpStatusCode code, Exception exp)
        {
            return Request.CreateErrorResponse(code, exp);
        }

        public void Bind(Func<HttpRequestMessage> func)
        {
            this.binder = func;
        }

        private HttpRequestMessage Request
        {
            get { return binder(); }
        }

        // Reference for new methods: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes

        // SUCCESS=================================================================================
        // Status 200 - OK
        public HttpResponseMessage ReturnSuccessOkay(string message, object content = null)
        {
            var response = new HttpAPIResponse();
            response.Message = "Success";
            response.MessageDetail = message;
            response.Content = content;
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

        // Status 201 - Created
        public HttpResponseMessage ReturnSuccessCreated(string message, object content = null)
        {
            var response = new HttpAPIResponse();
            response.Message = "Created";
            response.MessageDetail = message;
            response.Content = content;
            return Request.CreateResponse(HttpStatusCode.Created, response);
        }

        // Status 202 - Accepted
        public HttpResponseMessage ReturnSuccessAccepted(string message, object content = null)
        {
            var response = new HttpAPIResponse();
            response.Message = "Accepted";
            response.MessageDetail = message;
            response.Content = content;
            return Request.CreateResponse(HttpStatusCode.Accepted, response);
        }

        // Status 204 - No Content
        public HttpResponseMessage ReturnSuccessNoContent()
        {
            return Request.CreateResponse(HttpStatusCode.NoContent);
        }

        // Status 222 - Duplicate Found
        public HttpResponseMessage ReturnSuccessDuplicateResult(string message, object content = null)
        {
            var response = new HttpAPIResponse();
            response.Message = "Duplicate Found";
            response.MessageDetail = message;
            response.Content = content;
            return Request.CreateResponse((HttpStatusCode)222, response);
        }

        // CLIENT ERROR============================================================================
        // Status 400 - Bad Request
        public HttpResponseMessage ReturnErrorBadRequest(string message, object content = null)
        {
            var response = new HttpAPIResponse();
            response.Message = "Bad Request";
            response.MessageDetail = message;
            response.Content = content;
            return Request.CreateResponse(HttpStatusCode.BadRequest, response);
        }

        // Status 403 - Forbidden
        public HttpResponseMessage ReturnErrorForbidden(string message, object content = null)
        {
            var response = new HttpAPIResponse();
            response.Message = "Forbidden";
            response.MessageDetail = message;
            response.Content = content;
            return Request.CreateResponse(HttpStatusCode.Forbidden, response);
        }

        // Status 404 - Not Found
        public HttpResponseMessage ReturnErrorNotFound(string message, object content = null)
        {
            var response = new HttpAPIResponse();
            response.Message = "Not Found";
            response.MessageDetail = message;
            response.Content = content;
            return Request.CreateResponse(HttpStatusCode.Forbidden, response);
        }

        // Status 422 - Unprocessable Entity
        public HttpResponseMessage ReturnErrorUnexpectedResult(string message, object content = null)
        {
            var response = new HttpAPIResponse();
            response.Message = "Unprocessable Entity";
            response.MessageDetail = message;
            response.Content = content;
            return Request.CreateResponse((HttpStatusCode)422, response);
        }

        // SERVER ERROR============================================================================
        // Status 500 - Internal Server Error
        public HttpResponseMessage ReturnErrorInternalServer(string message, Exception exception = null)
        {
            var response = new HttpAPIResponse();
            response.Message = "Internal Server Error";
            response.MessageDetail = message;
            response.Content = exception;
            return Request.CreateResponse(HttpStatusCode.InternalServerError, response);
        }
    }
}