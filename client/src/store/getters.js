export const getFilteredProjects = (state) => {
    const adminProjects = state.userData.projects.filter((project) => project.status === 'admin');
    const memberProjects = state.userData.projects.filter((project) => project.status === 'member');

    return {
        adminProjects,
        memberProjects
    };
};

export const getUsersNotInTeam = (state) => {
    const usersNotInTeam = [];
    state.openProject.members.forEach((member) => {
        const memberId = member.info._id;
        if (
            !state.openTeam.teamDetail.members.includes(memberId) &&
            !state.openTeam.teamDetail.admins.includes(memberId)
        ) {
            usersNotInTeam.push(member);
        }
    });
    return usersNotInTeam;
};

export const getUsersInTeam = (state) => {
    const usersInTeam = [];
    state.openProject.members.forEach((member) => {
        const memberId = member.info._id;
        if (
            state.openTeam.teamDetail.members.includes(memberId) &&
            !state.openTeam.teamDetail.admins.includes(memberId)
        ) {
            usersInTeam.push(member);
        }
    });
    return usersInTeam;
};

export const getUsersThatCanTakeJobs = (state) => {
    const usersInTeam = [];
    state.openProject.members.forEach((member) => {
        const memberId = member.info._id;
        if (
            state.openTeam.teamDetail.members.includes(memberId) &&
            !state.openTeam.teamDetail.admins.includes(memberId)
        ) {
            usersInTeam.push(member);
        }
    });
    return usersInTeam;
}