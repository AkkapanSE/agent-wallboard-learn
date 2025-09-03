Login Agent: POST /api/agents/A004/login
Check Status: GET /api/agents (เห็น A004 status = Available)
Change Status: PATCH /api/agents/A004/status (เป็น Active)
Check Dashboard: GET /api/dashboard/stats (เลขเปลี่ยน)
Logout: POST /api/agents/A004/logout (status เป็น Offline)
