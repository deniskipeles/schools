<script>
  import { CONSTANTS } from "./CONSTANTS";

  export let school;

  import { Navbar,Dropdown, Chevron, DropdownItem,DropdownDivider, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte'
</script>

<Navbar let:hidden let:toggle>
  <NavBrand href="/">
    <img
      src={school.logo}
      class="mr-3 h-6 sm:h-9"
      alt={school.logo_name}
    />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      {school.logo_name}
    </span>
  </NavBrand>
  <div class="flex md:order-2">
    <Button size="sm">login</Button>
    <NavHamburger on:click={toggle} />
  </div>
  <NavUl {hidden} class="order-1">
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi id="nav-menu1" class="cursor-pointer"><Chevron aligned>Academics</Chevron></NavLi>
    <Dropdown triggeredBy="#nav-menu1" class="w-44 z-20">
      <DropdownItem>Test</DropdownItem>
      <DropdownItem>Examinations</DropdownItem>
      <DropdownItem>Public Test</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Test Alert</DropdownItem>
    </Dropdown>
    <NavLi id="nav-menu2" class="cursor-pointer"><Chevron aligned>School</Chevron></NavLi>
    <Dropdown triggeredBy="#nav-menu2" class="w-44 z-20">
      <DropdownItem>Teachers</DropdownItem>
      <DropdownItem>Examinations</DropdownItem>
      <DropdownItem>Subjects</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Departments</DropdownItem>
    </Dropdown>
    <NavLi id="nav-menu3" class="cursor-pointer"><Chevron aligned>Questions</Chevron></NavLi>
    <Dropdown triggeredBy="#nav-menu3" class="w-44 z-20">
      <DropdownItem>View All</DropdownItem>
      <DropdownItem>Examinations</DropdownItem>
      <DropdownItem>Revise</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Contest</DropdownItem>
    </Dropdown>
    <NavLi id="nav-menu4" class="cursor-pointer"><Chevron aligned>More</Chevron></NavLi>
    <Dropdown triggeredBy="#nav-menu4" class="w-44 z-20">
      <DropdownItem>Class Mates</DropdownItem>
      <DropdownItem>Resourses</DropdownItem>
      <DropdownItem>Notice Board</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Extra Curriculum</DropdownItem>
    </Dropdown>
    <NavLi href={`/${CONSTANTS.school}/admin`}>Teachers Pages</NavLi>
    <NavLi href={`/${CONSTANTS.school}/admin`}>Admin Pages</NavLi>
    <NavLi href="/contact">Contact</NavLi>
  </NavUl>
</Navbar>

