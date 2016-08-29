using System.Web.Mvc;
using Microsoft.Practices.Unity;
using System.Web.Http;
using RegressionMatrix.Context;
using RegressionMatrix.Utilities;
using RegressionMatrix.Services;

namespace RegressionMatrix
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = BuildUnityContainer();
            
            // register all your components with the container here
            // it is NOT necessary to register your controllers
            
            // e.g. container.RegisterType<ITestService, TestService>();
            
            DependencyResolver.SetResolver(new Unity.Mvc5.UnityDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
        }

        private static IUnityContainer BuildUnityContainer()
        {
            var container = new UnityContainer();

            container.RegisterType<IRegressionMatrixContextFactory, RegressionMatrixContextFactory>();

            container.RegisterType<IRequestResponseUtility, RequestResponseUtility>();
            container.RegisterType<IRegressionMatrixService, RegressionMatrixService>();

            return container;
        }
    }
}