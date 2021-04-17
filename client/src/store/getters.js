export const getFilteredProjects = (state) => {
    const adminProjects = state.userData.projects.filter((project) => project.status === 'admin');
    const memberProjects = state.userData.projects.filter((project) => project.status === 'member');

    return {
        adminProjects,
        memberProjects
    };
};
