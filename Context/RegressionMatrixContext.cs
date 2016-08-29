using RegressionMatrix.Models;
using System.Data.Entity;

namespace RegressionMatrix.Context
{
    public partial class RegressionMatrixContext : DbContext, IRegressionMatrixContext
    {
        public IDbSet<Browser> Browsers { get; set; }
        public IDbSet<Device> Devices { get; set; }
        public IDbSet<ProductRelease> ProductRelease { get; set; }
        public IDbSet<RiskLevel> RiskLevel { get; set; }
        public IDbSet<TestDeviceUserType> TestDeviceUserType { get; set; }
        public IDbSet<Test> Tests { get; set; }
        public IDbSet<UserType> UserTypes { get; set; }

        public RegressionMatrixContext()
            : base("Name=RegressionMatrixConnection")
        {
            InitializePartial();
        }

        partial void InitializePartial();
    }
}