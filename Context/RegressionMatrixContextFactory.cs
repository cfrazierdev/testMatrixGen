using System.Data.SqlClient;

namespace RegressionMatrix.Context
{
    public class RegressionMatrixContextFactory : IRegressionMatrixContextFactory
    {
        public IRegressionMatrixContext CreateRegressionMatrixContext()
        {
            return new RegressionMatrixContext();
        }
    }
}