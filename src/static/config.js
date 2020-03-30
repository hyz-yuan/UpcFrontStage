const serverUrl = "http://localhost:9080/test"
//const serverUrl = "https://www.intell-traffic.com:8444"
global.constants = {
    projectList: serverUrl + '/project/projectList',
    projectListByMid: serverUrl + '/project/getProjectByManagerId',
    progressList: serverUrl + '/progress/getProgressList',
    addProgress: serverUrl + '/progress/addProgressList',
    updateProgress: serverUrl + '/progress/updateProgressList',
    deleteProgress: serverUrl + '/progress/deleteProgressList',
    projectDetail: serverUrl + '/porject/projectDetail',
    technologySelect:serverUrl + '/technology/selectTechnology',
    updateTechnology:serverUrl + '/technology/updateTechnology',
    insertTechnology:serverUrl + '/technology/insertNewTechnology',
    deleteTechnology:serverUrl + '/technology/deleteNewTechnology',
};
