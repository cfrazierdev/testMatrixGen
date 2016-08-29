namespace RegressionMatrix.Utilities
{
    public class HttpAPIResponse
    {
        public string Message { get; set; }
        public string MessageDetail { get; set; }
        public object Content { get; set; }

        public HttpAPIResponse()
        { }
    }
}
