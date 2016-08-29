using RegressionMatrix.Context;
using RegressionMatrix.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RegressionMatrix.Services
{
    public class RegressionMatrixService : IRegressionMatrixService
    {
        private IRegressionMatrixContextFactory regressionMatrixContextFactory;
        private IRegressionMatrixContext regressionMatrixContext;

        public RegressionMatrixService(IRegressionMatrixContextFactory regressionMatrixContextFactory)
        {
            this.regressionMatrixContextFactory = regressionMatrixContextFactory;
        }

        public IEnumerable<Browser> GetBrowsers()
        {
            try
            {
                using (regressionMatrixContext = regressionMatrixContextFactory.CreateRegressionMatrixContext())
                {
                    IQueryable<Browser> browsers = from browser in regressionMatrixContext.Browsers
                                                   select browser;

                    return browsers.ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ProductRelease> GetProductReleases()
        {
            try
            {
                using (regressionMatrixContext = regressionMatrixContextFactory.CreateRegressionMatrixContext())
                {
                    IQueryable<ProductRelease> productReleases = from productRelease in regressionMatrixContext.ProductRelease
                                                                 select productRelease;

                    return productReleases.ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Test> GetTests()
        {
            try
            {
                using (regressionMatrixContext = regressionMatrixContextFactory.CreateRegressionMatrixContext())
                {
                    IQueryable<Test> tests = from test in regressionMatrixContext.Tests
                                             select test;

                    return tests.ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<UserType> GetUserTypes()
        {
            try
            {
                using (regressionMatrixContext = regressionMatrixContextFactory.CreateRegressionMatrixContext())
                {
                    IQueryable<UserType> userTypes = from userType in regressionMatrixContext.UserTypes
                                                     select userType;

                    return userTypes.ToList();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}