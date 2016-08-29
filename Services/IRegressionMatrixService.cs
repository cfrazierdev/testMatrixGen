using RegressionMatrix.Models;
using System.Collections.Generic;

namespace RegressionMatrix.Services
{
    public interface IRegressionMatrixService
    {
        IEnumerable<Browser> GetBrowsers();
        IEnumerable<ProductRelease> GetProductReleases();
        IEnumerable<Test> GetTests();
        IEnumerable<UserType> GetUserTypes();
    }
}
