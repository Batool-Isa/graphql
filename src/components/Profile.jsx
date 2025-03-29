import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import XPChart from "./XPChart";
import SkillChart from "./SkillChart";

const GET_USER_DATA = gql`
  query {
    user {
      id
      login
      attrs
      campus
      totalUp
      totalDown
      auditRatio
    }
    transaction(where: { type: { _eq: "xp" } }) {
      objectId
      amount
      createdAt
    }
    object {
      id
      name
      type
    }
    audit {
      auditorId
      groupId
      grade
      createdAt
    }
    result {
      userId
      groupId
    }
    progress {
      objectId
      grade
      object {
        name
      }
    }
  }
`;

export const GET_USER_SKILLS = gql`
  query GetUserSkills {
    user {
      transactions(
        order_by: [{ type: desc }, { amount: desc }]
        distinct_on: [type]
        where: {
          type: {
            _in: [
              "skill_js"
              "skill_go"
              "skill_html"
              "skill_prog"
              "skill_front-end"
              "skill_back-end"
            ]
          }
        }
      ) {
        type
        amount
      }
    }
  }
`;

const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER_DATA);
  const navigate = useNavigate();
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#DCD7C9",
          minHeight: "100vh",
        }}
      >
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  

  if (error) return <p>Error fetching data: {error.message}</p>;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  // Extract User Data
  const user = data?.user?.[0] || {};
  const userId = user.id || "N/A";
  const firstName = user.attrs?.firstName || "User";
  const lastName = user.attrs?.lastName || "User";
  const email = user.attrs?.email || "N/A";
  const campus = user.campus || "N/A";
  const username = user.login || "user";

  const auditRatio = parseFloat(user.auditRatio).toFixed(2);
  const auditsDone = `${(user.totalUp / 1000000).toFixed(2)} MB`;
  const auditsReceived = `${(user.totalDown / 1000000).toFixed(2)} MB`;

  return (
    <div
      style={{
        backgroundColor: "#DCD7C9",
        minHeight: "100vh",
        paddingBottom: "20px",
      }}
    >
      <ProfileHeader data={data} onLogout={handleLogout} />

      <div className="container text-center mt-5">
        <h1 className="fw-bold" style={{ fontSize: "3rem", color: "#2C3930" }}>
          Welcome,
          <span style={{ color: "#A27B5C" }}>
            {" "}
            {firstName} {lastName}!
          </span>
        </h1>
      </div>

      {/* Profile Information */}
      <div className="container mt-4">
        <div
          className="card shadow-lg p-4 text-white"
          style={{ backgroundColor: "#2C3930", borderRadius: "15px" }}
        >
          <div className="row">
            {/* Row 1 - Three Columns */}
            <div className="col-md-4 mb-3">
              <p>
                <strong>ID:</strong> {userId}
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <p>
                <strong>First Name:</strong> {firstName}
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <p>
                <strong>Last Name:</strong> {lastName}
              </p>
            </div>
          </div>

          <div className="row">
            {/* Row 2 - Three Columns */}
            <div className="col-md-4 mb-3">
              <p>
                <strong>Email:</strong> {email}
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <p>
                <strong>Campus:</strong> {campus}
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <p>
                <strong>Username:</strong> {username}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <div
          className="card shadow-lg p-4"
          style={{ backgroundColor: "#F5F5F5", borderRadius: "15px" }}
        >
          <h3 className="fw-bold text-center mb-4">XP & Grades Overview</h3>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="p-3 border rounded bg-light">
                <h5 className="text-success">Audit Ratio</h5>
                <p className="text-dark fw-semibold">{auditRatio}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border rounded bg-light">
                <h5 className="text-success">Audit Done</h5>
                <p className="text-dark fw-semibold">{auditsDone}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 border rounded bg-light">
                <h5 className="text-danger">Audit Recieved</h5>
                <p className="text-dark fw-semibold">{auditsReceived}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div
          className="card shadow-lg p-4"
          style={{ backgroundColor: "#F5F5F5", borderRadius: "15px" }}
        >
          <h3 className="fw-bold text-center mb-3">Transactions History</h3>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="">
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>XP Gained (KB)</th>
                </tr>
              </thead>
              <tbody>
                {data.transaction
                  .slice()
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 5)
                  .map((item, index) => {
                    const object = data.object.find(
                      (obj) => obj.id === item.objectId
                    );
                    return (
                      <tr key={index}>
                        <td>{object?.name || "N/A"}</td>
                        <td>{object?.type || "N/A"}</td>
                        <td>{(item.amount / 1000).toFixed(2)} KB</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SkillChart />

      <div className="container mt-4">
        <XPChart data={data.transaction} />
      </div>
    </div>
  );
};

export default Profile;
