<script>
  import { applyAction, enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import ErrorComp from "$lib/components/ErrorComp.svelte";
  import { pb } from "$lib/pocketbase";
  import {
    Card,
    Button,
    Label,
    Input,
    Checkbox,
    Breadcrumb,
    BreadcrumbItem,
    Spinner,
  } from "flowbite-svelte";
  import { onMount } from "svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  onMount(() => {
    if (data?.user) {
      goto("/account", { replaceState: true });
    }
  });
  /** @type {import('./$types').ActionData} */
  export let form;

  let loading = false;
</script>

<svelte:head>
  <title>Registration Form</title>
  <meta name="description" content="Add Questions And Answers Form" />
</svelte:head>

<Breadcrumb class="pt-16 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
  <BreadcrumbItem>Register</BreadcrumbItem>
</Breadcrumb>

{#if form?.error}
  <ErrorComp error={form?.error} />
{/if}

<Card>
  <form
    class="flex flex-col space-y-6"
    method="POST"
    use:enhance={() => {
      loading = true;
      return async ({ result, update }) => {
        pb.authStore.loadFromCookie(document.cookie);
        await applyAction(result);
        loading = false;
      };
    }}
  >
    <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
      Create Your Account
    </h3>
    <Label class="space-y-2">
      <span>Email</span>
      <Input
        type="email"
        name="email"
        placeholder="name@company.com"
        required
      />
    </Label>
    <Label class="space-y-2">
      <span>Your Password</span>
      <Input type="password" name="password" placeholder="•••••" required />
    </Label>
    <Label class="space-y-2">
      <span>Confirm Password</span>
      <Input
        type="password"
        name="passwordConfirm"
        placeholder="•••••"
        required
      />
    </Label>
    <div class="flex items-start">
      <Checkbox>Remember me</Checkbox>
      <a
        href="/"
        class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
        >Lost password?</a
      >
    </div>
    {#if loading}
      <Button id="b2" class="-mb-2">
        <Spinner />loading...
      </Button>
    {:else}
      <Button type="submit" class="w-full">Create your account</Button>
    {/if}
    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
      Registered? <a
        href="/login"
        class="text-blue-700 hover:underline dark:text-blue-500"
        >login to your account</a
      >
    </div>
  </form>
</Card>
