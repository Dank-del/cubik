import { Box, Container, Stack } from "@/utils/chakra";
import type { Team, User } from "@cubik/database";
import { prisma } from "@cubik/database";
import React from "react";
import { ProjectHeader } from "../components/ProjectHeader";

interface Props {
  params: {
    id: string[];
  };
  children: React.JSX.Element | React.JSX.Element[];
}
type Event = "preview" | "round" | "hackathon";
interface ProjectReturnType {
  id: string;
  name: string;
  industry: string;
  shortDescription: string;
  logo: string;
  projectLink: string;
  createdAt: Date;
  owner: User;
  projectUserCount: number;
  mutliSigAddress: string;
  team: Team[];
  projectJoinRound?: {
    round: {
      endTime: Date;
      startTime: Date;
    };
  };
  projectJoinHackathon?: {
    hackathon: {
      name: string;
      hackathonEndDate: Date;
      hackathonStartDate: Date;
      votingEndDate: Date;
      votingStartDate: Date;
    };
  }[];
}
const fetchProject = async (
  id: string,
  event?: "hackathon" | "round",
  eventId?: string
): Promise<ProjectReturnType | null> => {
  try {
    // when hackathon
    if (event && eventId && event === "hackathon") {
      const res = await prisma.project.findFirst({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          industry: true,
          shortDescription: true,
          logo: true,
          projectLink: true,
          createdAt: true,
          owner: true,
          projectUserCount: true,
          mutliSigAddress: true,
          team: true,
          projectJoinHackathon: {
            where: {
              hackathonId: eventId,
            },
            select: {
              hackathon: {
                select: {
                  name: true,
                  hackathonEndDate: true,
                  hackathonStartDate: true,
                  votingEndDate: true,
                  votingStartDate: true,
                },
              },
            },
          },
        },
      });
      return res as ProjectReturnType;
    }
    // when round
    if (event && eventId && event === "round") {
      const res = await prisma.project.findFirst({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          industry: true,
          shortDescription: true,
          logo: true,
          projectLink: true,
          projectJoinRound: {
            select: {
              round: {
                select: {
                  endTime: true,
                  startTime: true,
                },
              },
            },
          },
        },
      });
      return res as unknown as ProjectReturnType;
    }
    // default
    const res = await prisma.project.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        industry: true,
        shortDescription: true,
        logo: true,
        projectLink: true,
      },
    });
    return res as ProjectReturnType;
  } catch (error) {
    console.log(error);
    return null;
  }
};


const ProjectPageLayout = async ({ params, children }: Props) => {
  const project = await fetchProject(
    params.id[0]!,
    params.id[1] as "hackathon" | "round",
    params.id[2]
  );
  if (!project) {
    return <Box mt={10}>Project not found</Box>; // error state
  }

  return (
    <>
      <Container maxW={"full"} p="0" mt="4.5rem">
        <Stack
          maxW="7xl"
          mx="auto"
          gap={10}
          px={{ base: "1rem", sm: "2rem", md: "2rem", xl: "1rem" }}
          py={{ base: "24px", md: "64px" }}
          alignItems={"start"}
          mt={10}
          justifyContent={"start"}
        >
          <ProjectHeader
            team={project.team}
            multiSig={project.mutliSigAddress}
            projectId={project.id}
            userCount={project.projectUserCount}
            endTime={new Date()}
            startTime={new Date()}
            projectLink={project.projectLink}
            eventId={params.id[2]} // optional
            type={(params.id[1] as Event) || "preview"} // optional
            industry={project.industry}
            logo={project.logo}
            name={project.name}
            shortDescription={project.shortDescription}
            key={project.id}
            owner={project.owner?.mainWallet}
          />
          {children}
        </Stack>
      </Container>
    </>
  );
};

export default ProjectPageLayout;
