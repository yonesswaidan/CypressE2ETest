public class UserState
{
    public bool IsLoggedIn { get; private set; }
    public string LoggedInUsername { get; private set; }

    public void SetUser(string username)
    {
        IsLoggedIn = true;
        LoggedInUsername = username;
    }

    public void Logout()
    {
        IsLoggedIn = false;
        LoggedInUsername = null;
    }
}
