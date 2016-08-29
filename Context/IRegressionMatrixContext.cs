using RegressionMatrix.Models;
using System;
using System.Data.Entity;

namespace RegressionMatrix.Context
{
    public interface IRegressionMatrixContext : IDisposable
    {
        IDbSet<Browser> Browsers { get; set; }
        IDbSet<Device> Devices { get; set; }
        IDbSet<ProductRelease> ProductRelease { get; set; }
        IDbSet<RiskLevel> RiskLevel { get; set; }
        IDbSet<TestDeviceUserType> TestDeviceUserType { get; set; }
        IDbSet<Test> Tests { get; set; }
        IDbSet<UserType> UserTypes { get; set; }
    }
}
