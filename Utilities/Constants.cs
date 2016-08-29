using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RegressionMatrix.Utilities
{
    public class Constants
    {
        public enum ResponseType
        {
            SuccessOkay = 1,
            SuccessDuplicateResult = 2,
            SuccessAccepted = 3,
            ErrorUnexpectedResult = 4,
            ErrorBadRequest = 5,
            ErrorInternalServer = 6
        }
    }
}