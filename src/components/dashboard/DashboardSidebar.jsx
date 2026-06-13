
import { Bell, Envelope, Gear, Briefcase, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { BsLayoutTextSidebar } from "react-icons/bs";
import Link from 'next/link'
import {
    FiGrid,
    FiBriefcase,
    FiBookmark,
    FiFileText,
    FiCreditCard,
    FiSettings
} from "react-icons/fi";
import {
    FaHome,
    FaUsers,
    FaBuilding,
    FaBriefcase,
    FaCreditCard,
    FaCog,
} from "react-icons/fa";
import { getUserSession } from "@/lib/core/session";

const DashboardSidebar = async () => {
    const user = await getUserSession()
    const recruiterNavLinks = [
        { icon: House, href: "/dashboard/recruiter", label: "Home" },
        { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Create A Job" },
        { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company Profile" },
        { icon: Envelope, href: "/messages", label: "Messages" },
        { icon: Person, href: "/profile", label: "Profile" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ]
    const seekerNavLinks = [
        { icon: FiGrid, href: "/dashboard/seeker", label: "Dashboard" },
        { icon: FiBriefcase, href: "/dashboard/seeker/jobs", label: "Jobs" },
        { icon: FiBookmark, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs" },
        { icon: FiFileText, href: "/dashboard/seeker/applications", label: "Applications" },
        { icon: FiCreditCard, href: "/dashboard/seeker/billing", label: "Billing" },
        { icon: FiSettings, href: "/settings", label: "Settings" }
    ];
    const adminNavLinks = [
        { icon: FaHome, href: "/dashboard/admin", label: "Dashboard" },
        { icon: FaUsers, href: "/dashboard/admin/users", label: "Users" },
        { icon: FaBuilding, href: "/dashboard/admin/companies", label: "Companies" },
        { icon: FaBriefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
        { icon: FaCreditCard, href: "/dashboard/admin/payments", label: "Payments" },
        { icon: FaCog, href: "/dashboard/admin/settings", label: "Settings" },
    ];
    const navLinkMap = {
        seeker: seekerNavLinks,
        recruiter: recruiterNavLinks,
        admin: adminNavLinks
    }
    const navItems = navLinkMap[user?.role || 'seeker']; 
    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>
    return (
        <>
            <aside className="hidden w-64 shrink-0 bg-default p-4 lg:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className={"lg:hidden"} variant="secondary">
                    <BsLayoutTextSidebar></BsLayoutTextSidebar>
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
};

export default DashboardSidebar;