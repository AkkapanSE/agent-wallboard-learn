const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); 
const PORT = 3001;


let agents = [
    {
    code: "A001",        // รหัส Agent
    name: "SPK",         // เติมคิดเอง
    status: "Not Ready",       // เติมคิดเอง  
    // คิดต่อว่าควรมีอะไรอีก...
        },
    {
    code: "A002",        // รหัส Agent
    name: "AKP",         // เติมคิดเอง
    status: "Active",       // เติมคิดเอง  
    // คิดต่อว่าควรมีอะไรอีก...
        },
    {
    code: "A003",        // รหัส Agent
    name: "PNW",         // เติมคิดเอง
    status: "Available",       // เติมคิดเอง  
    // คิดต่อว่าควรมีอะไรอีก...
        },

    ];



app.get('/', (req, res) => {
    res.send(`Hello Agent Wallboard!`);
});

app.get('/hello', (req, res) => {
    res.send(`Akkapan Tosathisrangsan!`);
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString() 
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/api/agents', (req, res) => {
    // ควร return อะไร?
    res.json({
        success: true,     // เติม true/false
        data: agents,        // เติม agents หรือไม่?
        count: agents.length,       // เติมจำนวน agents
        timestamp: new Date().toISOString()    // เติมเวลาปัจจุบัน
    });
});

app.get('/api/agents/count', (req, res) => {
    // ควร return อะไร?
    res.json({
        success: true,     // เติม true/false
        count: agents.length,       // เติมจำนวน agents
        timestamp: new Date().toISOString()    // เติมเวลาปัจจุบัน
    });
});

app.use(express.json());

app.patch('/api/agents/:code/status', (req, res) => {
    // Step 1: ดึง agent code จาก URL
    const agentCode = req.params.code; // เติม

    // Step 2: ดึง status ใหม่จาก body
    const newStatus = req.body.status; // เติม
    
    console.log('Agent Code:', agentCode);
    console.log('New Status:', newStatus);
    //console.log(`[${new Date().toISOString()}] Agent ${agentCode}: ${oldStatus} → ${newStatus}`);

    // Step 3: หา agent ในระบบ
    const agent = agents.find(a => a.code === agentCode);
    
    console.log('found agent:', agent);

    // Step 4: ตรวจสอบว่าเจอ agent ไหม?
    if (!agent) {
        return res.status(404).json({
            success: false,
            error: "Agent not found"
        });
    }

     // Step 5: ตรวจสอบว่า status ที่ส่งมาถูกต้องไหม?
    const validStatuses = ["Available", "Active", "Wrap Up", "Not Ready", "Offline"];
    if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({
            success: false,
            error: "Invalid status",
            validStatuses: validStatuses
        });
    }  
    
    // Step 6: บันทึกสถานะเดิมไว้ (เพื่อ log)
    const oldStatus = agent.status;

    // Step 7: เปลี่ยน status
    agent.status = newStatus;
    agent.lastStatusChange = new Date();
    
    console.log('current agent :', agent);

    // 🟢 Mini Challenge 3: console.log status change
    console.log(`[${new Date().toISOString()}] Agent ${agentCode}: ${oldStatus} → ${newStatus}`);


    // Step 8: ส่ง response กลับ
    res.json({
        success: true,
        message: `Agent ${agentCode} status changed from ${oldStatus} to ${newStatus}`,
        data: agent
    });


});


app.get('/api/agents', (req, res) => {
   
    res.json({
        success: true,     // เติม true/false
        data: agents,        // เติม agents หรือไม่?
        count: agents.length,       // เติมจำนวน agents
        timestamp: new Date().toISOString()    // เติมเวลาปัจจุบัน
    });

});

app.get('/api/agents/count', (req, res) => {
   
    res.json({
        success: true,     // เติม true/false
        count: agents.length,       // เติมจำนวน agents
        timestamp: new Date().toISOString()    // เติมเวลาปัจจุบัน
    });

});

app.get('/api/dashboard/stats', (req, res) => {
    // ขั้นที่ 1: นับจำนวนรวม
    const totalAgents = agents.length;

    // ขั้นที่ 2: นับจำนวนในแต่ละ status
    const available = agents.filter(a => a.status === "Available").length;
    const active = agents.filter(a => a.status === "Active").length;
    const wrapUp = agents.filter(a => a.status === "Wrap Up").length;
    const notReady = agents.filter(a => a.status === "Not Ready").length;
    const offline = agents.filter(a => a.status === "Offline").length;

    // helper function สำหรับ percent
    const calcPercent = (count) => totalAgents > 0 ? Math.round((count / totalAgents) * 100) : 0;

    // ขั้นที่ 3: ส่ง response กลับแบบจัดรูป
    res.json({
        success: true,
        data: {
            total: totalAgents,
            statusBreakdown: {
                available: { count: available, percent: calcPercent(available) },
                active: { count: active, percent: calcPercent(active) },
                wrapUp: { count: wrapUp, percent: calcPercent(wrapUp) },
                notReady: { count: notReady, percent: calcPercent(notReady) },
                offline: { count: offline, percent: calcPercent(offline) }
            },
            timestamp: new Date().toISOString()
        }
    });
});


app.get('/', (req, res) => {
    res.send(`Hello Agent Wallboard!`);
});

app.get('/hello', (req, res) => {
    res.send(`Hello สวัสดี!`);
});

app.get('/health', (req, res) => {
    res.send({ 
        status: 'OK', 
        timestamp: new Date().toISOString() 
    });
});






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
