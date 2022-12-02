<script>
	import '$lib/styles.css';
  	import { school } from '$lib/store/school';
  	import CreateTeacherDrawer from '$lib/components/CreateTeacherDrawer.svelte';
	import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';
	let searchTerm = '';
	
	

	

	/** @type {import('./$types').PageData} */
	export let data;
	$: token = data.session?.access_token
	// console.log(data.teachers)
	$: teachers = data.teachers ? data.teachers : []

	$: filteredItems = teachers.filter(
		(item) => (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) || (item.teacher_no.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
	);
</script>

<svelte:head>
	<title>{$school ? $school.name : "school"} Teachers</title>
	<meta name="description" content="HTML, dynamically rendered in a city near you" />
</svelte:head>


<CreateTeacherDrawer {token}/>





<TableSearch
  color="red"
  placeholder="Search Teacher by Name or ID"
  hoverable={true}
  bind:inputValue={searchTerm}
>
  <TableHead>
	<TableHeadCell>ID</TableHeadCell>
	<TableHeadCell>Name</TableHeadCell>
	<TableHeadCell>Position</TableHeadCell>
	<TableHeadCell>Subjects Teaching</TableHeadCell>
	<TableHeadCell>Teacher Type</TableHeadCell>
	<TableHeadCell>Teaching since</TableHeadCell>
	<TableHeadCell>Active</TableHeadCell>
  </TableHead>
  <TableBody class="divide-y">
	{#each filteredItems as item}
	  <TableBodyRow>
		<TableBodyCell>{item.teacher_no}</TableBodyCell>
		<TableBodyCell>{item.name}</TableBodyCell>
		<TableBodyCell>{item.position}</TableBodyCell>
		<TableBodyCell>
			{#each item.teacher_subjects as subjects}
				<!-- content here -->
				<p>{subjects.subjects.code} {subjects.subjects.name}</p>
			{/each}
		</TableBodyCell>
		<TableBodyCell>{item.teacher_type}</TableBodyCell>
		<TableBodyCell>{item.teacher_since}</TableBodyCell>
		<TableBodyCell>{item.active ? "YES" : "NO"}</TableBodyCell>
	  </TableBodyRow>
	{/each}
  </TableBody>
</TableSearch>