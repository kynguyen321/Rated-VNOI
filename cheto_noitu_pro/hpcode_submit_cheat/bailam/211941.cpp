#include<bits/stdc++.h>
using namespace std;
#define ll long long
ll n, k;
vector <pair<ll, ll>> adjacent[500010];
bool visited[500010];
pair <ll, ll> trace[500010];
void dfs(ll u)
{
    visited[u] = true;
    for(auto x : adjacent[u])
    {
        if(!visited[x.first])
        {
            trace[x.first].first = u;
            trace[x.first].second = x.second;
            dfs(x.first);
        }
    }
}
void answer()
{
    vector <ll> inp;
    ll ans = 0;
    for(ll i=1;i<=k;i++)
    {
        ll x;
        cin>>x;
        inp.push_back(x);
    }
    
    dfs(inp[0]);
    memset(visited, false, sizeof(visited));
    for(auto x : inp)
    {
        ll q = x;
        while(!visited[q])
        {
            visited[q] = true;
            ans+=trace[q].second;
            q = trace[q].first;
        }
    }
    cout<< ans;
}
int main()
{
    cin>>n>>k;
    for(ll i=1;i<=n-1;i++)
    {
        ll x, y, z;
        cin>>x>>y>>z;
        adjacent[x].push_back({y, z});
        adjacent[y].push_back({x, z});
    }
    answer();
    return 0;
}